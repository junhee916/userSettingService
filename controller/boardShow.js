const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const boardId = urlParams.get("boardId")
const BearerToken = `Bearer ${localStorage.getItem("token")}`
$(document).ready(function(){
    $.ajax({
        type : "GET",
        url : `/board/detail/${boardId}`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log('get board data 확인: ', response)
            const No = response["boardData"][0]["_id"]
            const boardInUser = response["boardData"][0]["user"]
            const board = response["boardData"][0]["board"]
            const updatedAt = moment(response["boardData"][0]["updatedAt"]).format('YYYY-MM-DD HH:mm:ss')
            const tokenInUser = response["userID"]
            const user = response["boardData"][0]["user_docs"][0]
            $("#No").text(No)
            $("#COMPANY").text(user["COMPANY"])
            $("#NAME").text(user["NAME"])
            $("#ID").text(boardInUser)
            $("#board").val(board)
            $("#updatedAt").text(updatedAt)
            viewCommend(No)
            if(boardInUser == tokenInUser){
                const temp = 
                `
                <td>
                    <input type="button" value="수정" onclick="updateBoard()">
                </td>
                <td>
                    <input type="button" value="삭제" onclick="deleteBoard()">
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
function viewCommend(boardId){
    $.ajax({
        type : "GET",
        url : `/commend/get/${boardId}`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log(response)
            const commends = response["commendData"]
            for(const commend of commends){
                const updatedAt = moment(commend["updatedAt"]).format('YYYY-MM-DD HH:mm:ss')
                const temp = 
                `
                <tr>
                    <td>
                        <a href="/commendShow?commendId=${commend["_id"]}">${commend["_id"]}</a>
                    </td>
                    <td>${commend["user_docs"]["0"]["ID"]}</td>
                    <td>${commend["commend"]}</td>
                    <td>${updatedAt}</td>
                </tr>
                `
                $("#commendView").append(temp)
            }
        }
    })
}
function updateBoard(){
    const board = $("#board").val()
    $.ajax({
        type : "POST",
        url : `/board/update/${boardId}`,
        data : {
            board : board
        },
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            if(response){
                alert("게시글 수정이 완료되었습니다.")
                window.location.href=`/boardShow?boardId=${boardId}`
            }
            else{
                alert("게시글 수정이 미완료되었습니다.")
                window.location.href=`/boardShow?boardId=${boardId}`
            }
        }
    })
}
function deleteBoard(){
    $.ajax({
        type : "POST",
        url : `/board/delete/${boardId}`,
        data : {},
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            if(response){
                alert("게시글이 정상적으로 삭제가 완료되었습니다.")
                window.location.href="/board"
            }
            else{
                alert("게시글이 삭제 실패하셨습니다.")
                window.location.href=`/boardShow?boardId=${boardId}`
            }
        }
    })
}
function addCommend(){
    const board = $("#No").text()
    const commend = $("#commend").val()
    $.ajax({
        type : "POST",
        url : `/commend/save`,
        data : {
            board : board,
            commend : commend
        },
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            if(response){
                alert("댓글 작성이 성공적으로 완료되었습니다.")
                window.location.href=`/boardShow?boardId=${boardId}`
            }
            else{
                alert("댓글 작성 실패하셨습니다.")
                window.location.href=`/boardShow?boardId=${boardId}`
            }
        }
    })
}