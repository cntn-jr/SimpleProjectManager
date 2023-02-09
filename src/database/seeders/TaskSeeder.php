<?php

namespace Database\Seeders;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Task::factory()->count(100)->create();
        Task::factory()->create([
            "title" => "環境構築", "user_id" => 1,
        ]);
        Task::factory()->create([
            "title" => "ログイン機能の作成", "user_id" => 1,
        ]);
        Task::factory()->create([
            "title" => "ログアウト機能の作成", "user_id" => 1,
        ]);
        Task::factory()->create([
            "title" => "タスク取得APIの修正", "user_id" => 1,
        ]);
        Task::factory()->create([
            "title" => "タスクのソート機能の作成", "user_id" => 1,
        ]);
        Task::factory()->create([
            "title" => "タスク削除の確認モーダルの作成", "user_id" => 1,
        ]);
        Task::factory()->create([
            "title" => "認証情報の保持機能の変更", "user_id" => 1,
        ]);
        Task::factory()->create([
            "title" => "中田先輩への報告", "user_id" => 1,
        ]);
    }
}
