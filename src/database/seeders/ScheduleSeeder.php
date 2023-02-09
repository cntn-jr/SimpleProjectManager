<?php

namespace Database\Seeders;

use App\Models\Schedule;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Schedule::factory()->count(30)->create();
        Schedule::factory()->create(["title" => "単体テストの完成"]);
        Schedule::factory()->create(["title" => "結合テストの完成"]);
        Schedule::factory()->create(["title" => "フロントエンドの完成"]);
        Schedule::factory()->create(["title" => "バックエンドの完成"]);
        Schedule::factory()->create(["title" => "ユーザテストの実施"]);
        Schedule::factory()->create(["title" => "使用するライブラリの決定"]);
        Schedule::factory()->create(["title" => "要件定義書の作成"]);
        Schedule::factory()->create(["title" => "設計書の作成"]);
    }
}
