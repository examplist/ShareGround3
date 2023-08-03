export function login(email: string, name: string) {
  localStorage.setItem('authStatus', 'fetched');
  localStorage.setItem('authName', name);
  localStorage.setItem('authEmail', email);
  return { status: 'fetched', name, email };
}

export function logout() {
  localStorage.setItem('authStatus', 'failed');
  localStorage.removeItem('authEmail');
  localStorage.removeItem('authName');
  return { status: 'failed', name: null, email: null };
}

export function loginLocal() {
  const status = localStorage.getItem('authStatus');
  const email = localStorage.getItem('authEmail');
  const name = localStorage.getItem('authName');

  if (!status) {
    localStorage.setItem('authStatus', 'failed');
    return { status: 'failed', email, name };
  } else {
    // ! failed인 경우도 포함
    return { status, email, name };
  }
}

export function changeUsername(name: string) {
  localStorage.setItem('authName', name);
}
