function mpaLoginBtn(){
    const ID = $("#ID").val()
    const password = $("#password").val()
    $.ajax({
        type : "POST",
        url : "/user/login",
        data : {
            ID : ID,
            password : password
        },
        success : function(response){
            if(response){
                const ID = $("#ID").val()
                getUserMpa(ID)
                let token = response.token
                localStorage.setItem("token", token)
                window.location.href="/board"
            }
            else{
                alert("로그인에 실패하셨습니다. 다시 시도해주시길 바랍니다.")
                window.location.href = "/userLogin"
            }
        }
    })
}
function getUserMpa(userID){
    $.ajax({
        type : "GET",
        url : `/user/getMpa/${userID}`,
        success : function(response){
            if(response){
                const mpaInUser = response["userData"]["MPA"]
                if(mpaInUser == "W"){
                    alert("심사중입니다.")
                    window.location.href="/userLogin"
                }
                else if(mpaInUser == "N"){
                    alert("권한이 없습니다.")
                    window.location.href="/userLogin"
                }
                else{
                    alert("로그인에 성공하셨습니다.")
                }
            }
            else{

            }
        }
    })
}