function mpaSignupBtn(){
    const ID = $("#ID").val()
    const password = $("#password").val()
    const COMPANY = $("#COMPANY").val()
    $.ajax({
        type : "POST",
        url : `/mpa/signup`,
        data : {
            ID : ID,
            password : password,
            COMPANY : COMPANY
        },
        success : function(response){
            if(response){
                alert("MPA 회원가입 성공하셨습니다.")
                window.location.href="/mpaLogin"
            }
            else{
                alert("회원가입 실패하셨습니다. 다 시도해주시길 바랍니다.")
                window.location.href="/userSignup"
            }
        }
    })
}