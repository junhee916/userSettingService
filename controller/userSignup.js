function userSignupBtn(){
    const NAME = $("#NAME").val()
    const EMAIL = $("#EMAIL").val()
    const ID = $("#ID").val()
    const password = $("#password").val()
    const COMPANY = $("#COMPANY").val()
    $.ajax({
        type : "POST",
        url : `/user/signup`,
        data : {
            NAME : NAME,
            EMAIL : EMAIL,
            ID : ID,
            password : password,
            COMPANY : COMPANY
        },
        success : function(response){
            if(response){
                alert('회원가입이 완료되었습니다.')
                window.location.href="/userLogin"
            }
            else{
                alert("회원가입에 실패하셨습니다. 다시 시도해주시길 바랍니다.")
                window.location.href="/userSignup"
            }
        }
    })
}