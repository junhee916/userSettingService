function mpaLoginBtn(){
    const ID = $("#ID").val()
    const password = $("#password").val()
    $.ajax({
        type : "POST",
        url : `/mpa/login`,
        data : {
            ID : ID,
            password : password
        },
        success : function(response){
            if(response){
                let token = response.token
                localStorage.setItem("token", token)
                location.href = '/viewAuthority'
            }
            else{

            }
        }
    })
}