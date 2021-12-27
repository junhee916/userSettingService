const BearerToken = `Bearer ${localStorage.getItem("token")}`
function addBoard(){
    const board = $("#board").val()
    $.ajax({
        type : "POST",
        url : `/board/save`,
        data : {
            board : board
        },
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            if(response){
                alert("게시글 작성이 완료되었습니다.")
                window.location.href="/board"
            }
            else{
                alert("게시글 작성이 미완료되었습니다.")
                window.location.href="/board"
            }
        }
    })
}
$(document).ready(function(){
    $.ajax({
        type : "GET",
        url : `/board/allGet`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log('boards data 확인: ', response)
            const boards = response["boardsData"]
            for(const board of boards){
                const updatedAt = moment(board["updatedAt"]).format('YYYY-MM-DD HH:mm:ss')
                const temp = 
                `
                <tr>
                    <td>ID: </td>
                    <td>${board["user"]}</td>    
                    <td>${updatedAt}</td>
                </tr>
                <tr>
                    <td>게시글: </td>
                    <td>${board["board"]}</td>
                    <td>
                        <a href="/boardShow?boardId=${board["_id"]}">상세</a>
                    </td>
                </tr>
                `
                $("#viewBoard").append(temp)
            }
        }
    })
})