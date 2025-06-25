CREATE SCHEMA IF NOT EXISTS blog;

CREATE TABLE IF NOT EXISTS blog.posts (
    id UUID PRIMARY KEY,
    title VARCHAR(25) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT posts_title_check CHECK (
        char_length(title) <= 25 AND 
        title !~* '\m(תשוש|תרנגול|פעמון|נועה|קירל|מרגול|קונץ)\M'
    ),

    CONSTRAINT posts_content_check CHECK (
        char_length(content) <= 200 AND 
        (length(regexp_replace(content, '[^א-ת]', '', 'g'))::double precision / GREATEST(length(content), 1)) > 0.5
    )
);
