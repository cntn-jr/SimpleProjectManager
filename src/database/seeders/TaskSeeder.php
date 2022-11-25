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

        // 対象
        $objects = ['チーム', 'コード', 'テスト', 'メンバー', 'アプリ', 'SQL', 'バックエンド', 'フロントエンド', 'バグ', '仕様書', 'デザイン', 'SPA', '検索機能', 'ログイン機能', 'API認証', 'test.phpの62行目', 'JSOMデータの出力', 'プロフィール画面の更新ボタン', '進捗情報削除処理のテスト', 'タスク関連の作成機能', 'サイト訪問回数のグラフ', 'データの絞り込み機能と検索機能', 'ログインページのデザイン', '生徒側のエントリーボタンと取り消しボタン', 'ワークスペースに生徒を追加する機能', 'コンフリクト', 'エントリー登録と削除のバグ', 'ユーザシーダー', '生徒のマイグレーション', 'ログインコントローラー'];

        // 助詞
        $particle = ['を', 'は', 'に', 'が', 'も', 'から', 'より', 'と'];

        // 動詞
        $verb = ['作成する', '更新する', '削除する', '修正する', '変更する', '登録する', '入力する', '出力する', '追加する', 'テストする', 'リクエストする', '記述する', 'リファクタリングする', 'エラーが出ないように修正する', '開発する', '対応する'];

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
                'title' => $objects[rand(0, count($objects) - 1)] . $particle[rand(0, count($particle) - 1)] . $verb[rand(0, count($verb) - 1)],
                'description' => Str::random(rand(0, 519)),
                'priority' => $priority[rand(0, 2)],
                'due' => $date,
                'user_id' => 1,
                'is_finished' => rand(0, 1),
            ]);
        }
    }
}
