
$(document).ready(function () { 
//get input field and keyup event Listener
    $('#searchUser').on('keyup', function (e) { 
        let username = e.target.value;
    
$.ajax({

url: `https://api.github.com/users/${username}`,
data: {
    client_id: '0ef0aa44842f59660b76',
    client_secret: 'deda725b4d642b782678a86a2fb29c14593e9933'
}
}).done(function (user) {
//when that request is done we can make another
$.ajax({
    url: `https://api.github.com/users/${username}/repos`,
    data: {
        client_id: '0ef0aa44842f59660b76',
        client_secret: 'deda725b4d642b782678a86a2fb29c14593e9933',
        //the api allows us sort the data and the data per page
        sort: 'created: asc',
        per_page: 5
    }
}).done(function (repos) { 
    //loop thru the repos arrays to get individual repo
    $.each(repos, function(index, repo){  
        //if we use .html for the div the
        //iterations will overide each other so we append
        $('.repos').append(`
            <div class="breadcrumb">
            <div class="row">
            <div class="col-md-4">
            <strong>${repo.name}</strong>:${repo.description}
            </div>
            <div class="col-md-6">
            <span class="badge badge-warning">Forks: ${repo.forks_count}</span>
            <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
            <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
            </div>
            <div class="col-md-4">
            <a href="${repo.html_url}" target="_blanck" class="btn btn-primary">Repo Page</a>
            </div>
            </div>
            </div>
        `);
    });
});

$('#profile').html(`
<div class="card">
<h5 class="card-header">${user.name}</h5>
<div class="card-body">
    <div class="row">
    <div class="col-md-3">
    <img src="${user.avatar_url}" alt="user_avatar" class="thumbnail avatar_url"/> 
    <a href="${user.html_url}" class="btn btn-primary btn-block mt-2" target="_blanck">View Profile</a>
    </div>
    <div class="col-md-9">
    <span class="badge badge-warning">public repos: ${user.public_repos}</span>
    <span class="badge badge-primary"> public gists: ${user.public_gists}</span>
    <span class="badge badge-success">followers: ${user.followers}</span>
    <span class="badge badge-info">following: ${user.following}</span>
    <br><br>
    <ul class="list-group">
    <li class="list-group-item">Company: ${user.company}</li>
    <li class="list-group-item">Website/Blog: ${user.blog}</li>
    <li class="list-group-item">Location: ${user.location}</li>
    <li class="list-group-item">Member Since: ${user.created_at}</li>
    </ul>
    </div>
    </div>
</div>
</div>
<h3 class="page-header text-center"">Latest repos</h3>
<div class="repos"></div>

`);
});
});
});