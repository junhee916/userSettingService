const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const commendId = urlParams.get("commendId")
const BearerToken = `Bearer ${localStorage.getItem("token")}`
$(document).ready(function(){
    $.ajax({
        type : "GET",
        url : `/commend/detail/${commendId}`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log('commend data 확인: ', response)
            const commendInUser = response["commendData"][0]["user"]
            const tokenInUser = response["userID"]
            const No = response["commendData"][0]["_id"]
            const commend = response["commendData"][0]["commend"]
            const updatedAt = moment(response["commendData"][0]["updatedAt"]).format('YYYY-MM-DD HH:mm:ss')
            const user = response["commendData"][0]["user_docs"][0]
            $("#No").text(No)
            $("#COMPANY").text(user["COMPANY"])
            $("#NAME").text(user["NAME"])
            $("#ID").text(commendInUser)
            $("#commend").text(commend)
            $("#updatedAt").text(updatedAt)
            if(commendInUser == tokenInUser){
                const temp = 
                `
                <td>
                    <input type="button" value="삭제" onclick="deleteCommend()">
                </td>
                `
                $("#bottonView").append(temp)
            }
            else{
                const temp = 
                `
                수정 권한이 없습니다.
                `
                $("#bottonView").append(temp)
            }
        }
    })
})
function deleteCommend(){
    $.ajax({
        type : "POST",
        url : `/commend/delete/${commendId}`,
        data : {},
        success : function(response){
            if(response){
                alert("댓글 삭제가 완료되었습니다.")
                window.location.href="/board"
            }
            else{
                alert("댓글 삭제 실패하셨습니다.")
                window.location.href=`/commendShow?commendId=${commendId}`
            }
        }
    })
}