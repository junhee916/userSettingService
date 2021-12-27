const BearerToken = `Bearer ${localStorage.getItem("token")}`
$(document).ready(function(){
    $.ajax({
        type : "GET",
        url : `/mpa/getUser`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log('get user data: ',response["usersData"])
            const users = response["usersData"]
            for(const user of users){
                const updatedAt = moment(user["updatedAt"]).format('YYYY-MM-DD HH:mm:ss')
                const MPA = (user["MPA"]=="Y")?"사용중":(user["MPA"]=="W")?"대기중":"제거"
                const temp = 
                `
                <tr>
                    <td>${user["_id"]}</td>
                    <td>${user["ID"]}</td>
                    <td>${user["NAME"]}</td>
                    <td>${user["EMAIL"]}</td>
                    <td>${updatedAt}</td>
                    <td>
                        <a href="/setUserShow?userId=${user['_id']}">관리</a>
                    </td>
                    <td>${MPA}</td>
                </tr>
                `
                $("#viewUserAuthority").append(temp)
            }
        }
    })
    $.ajax({
        type : "GET",
        url : `/mpa/getCOMPANY`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log('mpa data: ', response["mpaData"])
            const mpa = response["mpaData"]
            $("#mpaCOMPANY").text(mpa["COMPANY"])
        }
    })
})