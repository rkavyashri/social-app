select user_id,password_hash,salt from administration.test_user
where user_name = $1  and is_active = b'1'