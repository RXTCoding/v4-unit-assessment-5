--Write a query that will get posts from everyone but the current user, with the newest ones first
select p.id as post_id, title, content, img, profile_pic, date_created, username as author_username from helo_posts p
join helo_users u on u.id = p.author_id
where lower(!p.author_id.title) like $1
order by date_created desc;