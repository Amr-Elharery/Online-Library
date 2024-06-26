function checkCredentials() {
  if (localStorage.getItem('user')) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user.is_staff) {
      window.location.href = '/pages/admin/admin-home/admin-home.html';
    } else {
      window.location.href = '/pages/user/user-home/user-home.html';
    }
  }
}
checkCredentials();
