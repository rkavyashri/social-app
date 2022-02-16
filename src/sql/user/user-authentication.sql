select user_id from administration.test_users 
where user_name = $1  and is_active = b'1'