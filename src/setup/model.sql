
\c postgres;

drop database if exists youtube;

create database youtube;

\c youtube;


drop table if exists users;
create table users (
    user_id serial primary key,
    user_name character varying(255) not null,
    user_password text,
    user_avatar text,
    user_created_at timestamptz default current_timestamp,
    user_deleted_at timestamptz default null
);

drop table if exists videos;
create table videos (
    video_id serial primary key,
    user_id serial not null references users(user_id),
    video_link int default 1,
    video_created_at timestamptz default current_timestamp,
    video_deleted_at timestamptz default null 
);