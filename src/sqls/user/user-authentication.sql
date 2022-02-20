select user_id,password_hash,salt from administration.users
where user_name = $1  and is_active = b'1'