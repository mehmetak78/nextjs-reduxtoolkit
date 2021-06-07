import {compare, hash} from 'bcryptjs';

export async function hashPassword(password) {
  return await hash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
  return await compare(password, hashedPassword);
}

export async function fetchAuth(userData) {

  let url;
  let dataForFetch;
  let method = 'POST';

  switch (userData.authType) {
    case 'signup' : {
      url = '/api/auth/signup';
      dataForFetch = {
        email: userData.username,
        password: userData.password,
      }
      method = 'POST';
      break;
    }
    case 'change-password' : {
      url = '/api/auth/change-password';
      dataForFetch = {
        oldPassword: userData.oldPassword,
        newPassword: userData.newPassword
      }
      method = 'PATCH';
      break;
    }
    case 'getuserdata' : {
      url = '/api/auth/XXXXX';
      dataForFetch = {
        idToken: userData.token,
      }
      break;
    }
    default : {
      url = '/api/auth/XXXX';
      dataForFetch = {
        email: userData.username,
        password: userData.password,
        returnSecureToken: true
      }
      break;
    }
  }

  console.log(url)
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(dataForFetch),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong ');
  }

  return data;
}
