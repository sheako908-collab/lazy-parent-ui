const cloudbase = require('@cloudbase/node-sdk');

const app = cloudbase.init({
  env: process.env.TCB_ENV
});

const db = app.database();
const users = db.collection('users');
const studentProfiles = db.collection('studentProfiles');

exports.main = async (event) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : (event.body || {});
    const { phone, password = 'password', role = 'student' } = body;

    if (!phone) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: '缺少手机号' })
      };
    }

    const { data: existList } = await users.where({ phone }).limit(1).get();
    if (existList[0]) {
      return {
        statusCode: 409,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: '用户已存在，请直接登录' })
      };
    }

    const now = new Date();

    const userRes = await users.add({
      phone,
      password,
      role,
      createdAt: now,
      updatedAt: now
    });

    const userId = userRes.id;

    let studentProfileDoc = null;
    if (role === 'student') {
      const spRes = await studentProfiles.add({
        userId,
        name: 'Student',
        grade: '三年级',
        school: '实验小学',
        createdAt: now
      });

      studentProfileDoc = {
        name: 'Student',
        grade: '三年级',
        school: '实验小学'
      };

      await users.doc(userId).update({
        studentProfileId: spRes.id,
        updatedAt: new Date()
      });
    }

    const responseUser = {
      id: userId,
      phone,
      role,
      studentProfile: studentProfileDoc || undefined
    };

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: 'mock-register-token', user: responseUser })
    };
  } catch (err) {
    console.error('auth-register error', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: '注册失败，请稍后再试' })
    };
  }
};

