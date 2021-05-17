select p.id as post_id, title, content, img, profile_pic, date_created, username as author_username from helo_posts p
join helo_users u on u.id = p.author_id
where lower(p.author_id.title) like $1 --What is the variable to put in for the current user?
order by date_created desc;
--current user's posts filtered out and ordered by the oldest first.
--Use an operator to make sure the author_id does not match the one sent from the controller file