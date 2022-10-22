<?php

namespace Database\Seeders;

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

        $priority = ['low', 'middle', 'high'];

        // 特定の2つの日付の例
        $start = Carbon::create("2022", "9", "1");
        $end = Carbon::create("2022", "11", "31");
        // タイムスタンプに変換
        $min = strtotime($start);
        $max = strtotime($end);
        // タイムスタンプにした2つの日付の中からランダムに1つタイムスタンプを取得
        $date = rand($min, $max);
        // タイムスタンプ => Y-m-d に変換
        $date = date('Y-m-d', $date);

        for ($i = 1; $i <= 30; $i++) {
            // タイムスタンプにした2つの日付の中からランダムに1つタイムスタンプを取得
            $date = rand($min, $max);
            // タイムスタンプ => Y-m-d に変換
            $date = date('Y-m-d', $date);

            DB::table('task')->insert([
                'id' => $i,
                'title' => Str::random(rand(1, 63)),
                'description' => Str::random(rand(0, 519)),
                'priority' => $priority[rand(0, 2)],
                'due' => $date,
                'user_id' => 1,
                'is_finished' => rand(0, 1),
            ]);
        }
    }
}
