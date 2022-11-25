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

            $objects = ['チーム', 'コード', 'テスト', 'メンバー', 'アプリ', 'SQL', 'バックエンド', 'フロントエンド', 'バグ', '仕様書', 'デザイン', 'SPA', '検索機能', 'ログイン機能', 'API認証', 'test.phpの62行目', 'JSOMデータの出力', 'プロフィール画面の更新ボタン', '進捗情報削除処理のテスト', 'タスク関連の作成機能', 'サイト訪問回数のグラフ', 'データの絞り込み機能と検索機能', 'ログインページのデザイン', '生徒側のエントリーボタンと取り消しボタン', 'ワークスペースに生徒を追加する機能', 'コンフリクト', 'エントリー登録と削除のバグ', 'ユーザシーダー', '生徒のマイグレーション', 'ログインコントローラー'];

            $particle = ['を', 'は', 'に', 'が', 'も', 'から', 'より', 'と'];

            $verb = ['作成する', '更新する', '削除する', '修正する', '変更する', '登録する', '入力する', '出力する', '追加する', 'テストする', 'リクエストする', '記述する', 'リファクタリングする', 'エラーが出ないように修正する', '開発する', '対応する'];

            DB::table('schedules')->insert([
                'id' => $i,
                'title' => $objects[rand(0, count($objects) - 1)] . $particle[rand(0, count($particle) - 1)] . $verb[rand(0, count($verb) - 1)],
                'description' => Str::random(rand(0, 519)),
                'start_date' => $start_date,
                'end_date' => $end_date,
                'type' => 'task',
                'progress' => 100,
            ]);
        }
    }
}
