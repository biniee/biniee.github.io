const onLoad = () => {
  const errorMessage = $('#errorMessage').val();
  if ($.trim(errorMessage) != '') {
    alert(errorMessage);
  }

  $('#loginForm').validate({
    rules: {
      j_username: {
        required: true,
      },
      j_password: {
        required: true,
      },
    },
    messages: {
      j_username: {
        required: '아이디를 입력해주세요.',
      },
      j_password: {
        required: '비밀번호를 입력해주세요.',
      },
    },
  });
};

export default onLoad;
