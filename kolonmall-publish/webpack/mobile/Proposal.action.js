$(document).on('mobile:Proposal:load', () => {
  $('#proposalFormSubmitBtn').click((e) => {
    e.preventDefault();

    $('#proposalForm').submit();
  });

  $('#proposalForm').validate({
    rules: {
      title: {
        required: true,
      },
      from_name: {
        required: true,
      },
      telno: {
        required: true,
      },
      from_email: {
        required: true,
        email: true,
      },
      content: {
        required: true,
      },
      agree: {
        required: true,
      },
    },
    messages: {
      title: {
        required: '제목을 입력해 주세요.',
      },
      from_name: {
        required: '이름을 입력해 주세요.',
      },
      telno: {
        required: '연락처를 입력해 주세요.',
      },
      from_email: {
        required: '이메일을 입력해 주세요.',
        email: '이메일 형식으로 입력해 주세요.',
      },
      content: {
        required: '내용을 입력해 주세요.',
      },
      agree: {
        required: '개인정보, 수집, 이용에 대한 동의를 하셔야 제휴문의가 가능합니다.',
      },
    },
    submitHandler: () => {
      const proposalFormSubmitBtnLadda = Ladda.create($('#proposalFormSubmitBtn')[0]);
      proposalFormSubmitBtnLadda.start();

      $.ajax({
        url: '/Proposal/Add',
        method: 'POST',
        data: $('#proposalForm').serialize(),
        dataType: 'JSON',
        success: () => {
          alert('문의가 접수 되었습니다.');
          location.href = '/FAQ';
        },
        complete: () => {
          proposalFormSubmitBtnLadda.stop();
        },
      });
    },
  });
});
