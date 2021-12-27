const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const userId = urlParams.get("userId")
const BearerToken = `Bearer ${localStorage.getItem("token")}`
$(document).ready(function(){
    $.ajax({
        type : "GET",
        url : `/mpa/detailUser/${userId}`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log('get user data: ', response)
            const user = response["userData"]
            const updatedAt = moment(user["updatedAt"]).format('YYYY-MM-DD HH:mm:ss')
            const MPA = (user["MPA"]=="Y")?"사용중":(user["MPA"]=="W")?"대기중":"제거"
            $("#NAME").text(user["NAME"])
            $("#ID").text(user["ID"])
            $("#EMAIL").text(user["EMAIL"])
            $("#updatedAt").text(updatedAt)
            $("#MPA").text(MPA)
        }
    })
})
function addSetUserBtn(){
    $.ajax({
        type : "POST",
        url : `/mpa/updateUser/${userId}`,
        data : {
        },
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            alert("사용자 권한이 허용되었습니다.")
            window.location.href=`/setUserShow?userId=${userId}`
        }
    })
}
function deleteSetUserBtn(){
    $.ajax({
        type : "POST",
        url : `/mpa/deleteUser/${userId}`,
        data : {
        },
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            alert("사용자 권한이 취소되었습니다.")
            window.location.href=`/setUserShow?userId=${userId}`
        }
    })
}
function emailSend(){
    const NAME = $("#NAME").text()
    const EMAIL = $("#EMAIL").text()
    const ID = $("#ID").text()
    $.ajax({
        type : "POST",
        url : `/mpa/sendMail`,
        data : {
            NAME : NAME,
            EMAIL : EMAIL,
            ID : ID
        },
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            alert("메일 전송이 성공적으로 진행되었습니다.")
        }
    })
}