-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create schema
CREATE SCHEMA IF NOT EXISTS blog;

-- Create posts table inside blog schema
CREATE TABLE blog.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  title VARCHAR(25) NOT NULL CHECK (
    char_length(title) <= 25 AND
    title !~* '\m(תשוש|תרנגול|פעמון|נועה|קירל|מרגול|קונץ)\M'
  ),

  content TEXT CHECK (
    char_length(content) <= 200 AND
    length(regexp_replace(content, '[^א-ת]', '', 'g'))::float /
    greatest(length(content), 1)::float > 0.5
  ),

  publish_time TIMESTAMP NOT NULL CHECK (publish_time > now())
);