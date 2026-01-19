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
    const { phone, password } = body;

    if (!phone || !password) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: '缺少手机号或密码' })
      };
    }

    const { data } = await users.where({ phone }).limit(1).get();
    const user = data[0];

    if (!user || user.password !== password) {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: '手机号或密码错误' })
      };
    }

    let studentProfile = null;
    if (user.studentProfileId) {
      const spRes = await studentProfiles.doc(user.studentProfileId).get();
      studentProfile = spRes.data[0] || null;
    }

    const responseUser = {
      id: user._id,
      phone: user.phone,
      role: user.role,
      studentProfile: studentProfile
        ? {
            name: studentProfile.name,
            grade: studentProfile.grade,
            school: studentProfile.school
          }
        : undefined
    };

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: 'mock-jwt-token', user: responseUser })
    };
  } catch (err) {
    console.error('auth-login error', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: '登录失败，请稍后再试' })
    };
  }
};

