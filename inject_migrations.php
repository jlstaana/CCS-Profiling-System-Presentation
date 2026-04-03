<?php
$migrationsDir = __DIR__ . '/Backend/database/migrations';
$files = scandir($migrationsDir);

$schemas = [
    'create_users_table' => <<<PHP
            \$table->string('role')->default('student');
            \$table->string('department')->nullable();
            \$table->string('course')->nullable();
            \$table->string('avatar_path')->nullable();
            \$table->text('bio')->nullable();
            \$table->longText('profile_pic_base64')->nullable();
PHP,
    'create_profile_requests_table' => <<<PHP
            \$table->id();
            \$table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            \$table->json('changes');
            \$table->string('status')->default('pending');
            \$table->timestamps();
PHP,
    'create_courses_table' => <<<PHP
            \$table->id();
            \$table->string('code');
            \$table->string('title');
            \$table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            \$table->timestamps();
PHP,
    'create_schedules_table' => <<<PHP
            \$table->id();
            \$table->foreignId('course_id')->constrained('courses')->onDelete('cascade');
            \$table->string('day');
            \$table->string('time_start');
            \$table->string('time_end');
            \$table->string('room');
            \$table->timestamps();
PHP,
    'create_course_materials_table' => <<<PHP
            \$table->id();
            \$table->foreignId('course_id')->constrained('courses')->onDelete('cascade');
            \$table->foreignId('uploaded_by')->constrained('users')->onDelete('cascade');
            \$table->string('title');
            \$table->string('file_path')->nullable();
            \$table->longText('file_base64')->nullable();
            \$table->timestamps();
PHP,
    'create_posts_table' => <<<PHP
            \$table->id();
            \$table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            \$table->text('content')->nullable();
            \$table->string('image_path')->nullable();
            \$table->integer('likes_count')->default(0);
            \$table->timestamps();
PHP,
    'create_comments_table' => <<<PHP
            \$table->id();
            \$table->foreignId('post_id')->constrained('posts')->onDelete('cascade');
            \$table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            \$table->text('content');
            \$table->timestamps();
PHP,
    'create_study_groups_table' => <<<PHP
            \$table->id();
            \$table->string('name');
            \$table->string('schedule')->nullable();
            \$table->text('agenda')->nullable();
            \$table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            \$table->timestamps();
PHP,
    'create_study_group_members_table' => <<<PHP
            \$table->id();
            \$table->foreignId('study_group_id')->constrained('study_groups')->onDelete('cascade');
            \$table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            \$table->timestamps();
PHP,
    'create_connections_table' => <<<PHP
            \$table->id();
            \$table->foreignId('requester_id')->constrained('users')->onDelete('cascade');
            \$table->foreignId('receiver_id')->constrained('users')->onDelete('cascade');
            \$table->string('status')->default('pending'); // pending, accepted, declined
            \$table->timestamps();
PHP,
    'create_conversations_table' => <<<PHP
            \$table->id();
            \$table->timestamps();
PHP,
    'create_messages_table' => <<<PHP
            \$table->id();
            \$table->foreignId('sender_id')->constrained('users')->onDelete('cascade');
            \$table->foreignId('receiver_id')->constrained('users')->onDelete('cascade');
            \$table->text('content');
            \$table->boolean('read')->default(false);
            \$table->timestamps();
PHP,
];

foreach ($files as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) === 'php') {
        $path = $migrationsDir . '/' . $file;
        $content = file_get_contents($path);
        
        foreach ($schemas as $tableName => $schema) {
            if (strpos($file, $tableName) !== false) {
                // If it's the users table, we just append to existing fields
                if ($tableName === 'create_users_table') {
                    $content = preg_replace('/(\$table->rememberToken\(\);)/', "$1\n" . $schema, $content);
                } else {
                    // For blank tables, replace timestamps with our schema (timestamps is included in our schema)
                    $content = preg_replace('/\$table->id\(\);\s*\$table->timestamps\(\);/', $schema, $content);
                }
                file_put_contents($path, $content);
                echo "Updated: $file\n";
            }
        }
    }
}
echo "Migration injection complete.\n";
