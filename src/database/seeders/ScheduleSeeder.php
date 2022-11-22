<?php

namespace Database\Seeders;

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
        for ($i = 1; $i <= 30; $i++) {
            // スケジュールの期間を決める
            $duration = rand(1, 20);
            // 開始日の範囲を指定
            $start_min = new Carbon('last month');
            $start_max = new Carbon('next month');
            // タイムスタンプに変換
            $start_min_timestamp = strtotime($start_min);
            $start_max_timestamp = strtotime($start_max);
            // タイムスタンプにした2つの日付の中からランダムに1つタイムスタンプを取得
            $start_timestamp = rand($start_min_timestamp, $start_max_timestamp);
            // タイムスタンプ => Y-m-d に変換
            $start_date = date('Y-m-d', $start_timestamp);
            $start_carbon = Carbon::createFromTimestamp($start_timestamp);
            $end_carbon = $start_carbon->addDay($duration);
            $end_date = date('Y-m-d', strtotime($end_carbon));

            DB::table('schedules')->insert([
                'id' => $i,
                'title' => Str::random(rand(1, 63)),
                'description' => Str::random(rand(0, 519)),
                'start_date' => $start_date,
                'end_date' => $end_date,
            ]);
        }
    }
}
