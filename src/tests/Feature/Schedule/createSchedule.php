<?php

namespace Tests\Feature\Schedule;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class createSchedule extends TestCase
{

    // テスト終了後にマイグレーションを実行する
    public function tearDown(): void
    {
        parent::setUp();
        $this->artisan('migrate:refresh --seed');
    }

    /**
     * @test
     */
    public function createTask()
    {
        // ユーザの作成
        $user = User::factory()->create();
        $user = User::find($user->id);
        $response = $this->actingAs($user)->json("POST", "api/schedule/store", [
            'start' => "2020-01-01",
            'end' => "2020-01-02",
            'name' => "title1",
            'id' => "Task 0",
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(200);
        $response = $this->actingAs($user)->json("POST", "api/schedule/store", [
            'start' => "2020-05-01",
            'end' => "2020-07-02",
            'name' => "title2",
            'id' => "Task 0",
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(200);
        $response = $this->actingAs($user)->json("POST", "api/schedule/store", [
            'start' => "2020-12-11",
            'end' => "2020-12-11",
            'name' => "title3",
            'id' => "Task 0",
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(200);
        // 上記で作成したデータがデータベースに存在するかチェック
        $this->assertDatabaseHas('schedules', [
            'start_date' => "2020-01-01",
            'end_date' => "2020-01-02",
            'title' => "title1",
            'type' => "task",
            'progress' => 100,
        ]);
        $this->assertDatabaseHas('schedules', [
            'start_date' => "2020-05-01",
            'end_date' => "2020-07-02",
            'title' => "title2",
            'type' => "task",
            'progress' => 100,
        ]);
        $this->assertDatabaseHas('schedules', [
            'start_date' => "2020-12-11",
            'end_date' => "2020-12-11",
            'title' => "title3",
            'type' => "task",
            'progress' => 100,
        ]);
    }

    /**
     * @test
     */
    public function createTaskByNotLoginUser()
    {
        $response = $this->json("POST", "api/schedule/store", [
            'start' => "2020-01-01",
            'end' => "2020-01-02",
            'name' => "title1",
            'id' => "Task 0",
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(401);
    }
    /**
     * @test
     */
    public function createScheduleValidationFailed()
    {
        // ユーザの作成
        $user = User::factory()->create();
        $user = User::find($user->id);
        // スケジュール作成APIの実行（nameがnullの場合）
        $response = $this->actingAs($user)->json("POST", "api/schedule/store", [
            'start' => "2020-01-01",
            'end' => "2020-01-02",
            'name' => "",
            'id' => "Task 0",
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(401);
        // スケジュール作成APIの実行（nameが63文字以上の場合）
        $response = $this->actingAs($user)->json("POST", "api/schedule/store", [
            'start' => "2020-01-01",
            'end' => "2020-01-02",
            'name' => str_repeat("a", 64),
            'id' => "Task 0",
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(401);
        // スケジュール作成APIの実行（startがnullの場合）
        $response = $this->actingAs($user)->json("POST", "api/schedule/store", [
            'start' => "",
            'end' => "2020-01-02",
            'name' => "",
            'id' => "Task 0",
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(401);
        // スケジュール作成APIの実行（startが正確な値でない場合）
        $response = $this->actingAs($user)->json("POST", "api/schedule/store", [
            'start' => "aaaaaaa",
            'end' => "2020-01-02",
            'name' => "",
            'id' => "Task 0",
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(401);
        // スケジュール作成APIの実行（endがnullの場合）
        $response = $this->actingAs($user)->json("POST", "api/schedule/store", [
            'start' => "2020-01-02",
            'end' => "",
            'name' => "",
            'id' => "Task 0",
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(401);
        // スケジュール作成APIの実行（endが正確な値でない場合）
        $response = $this->actingAs($user)->json("POST", "api/schedule/store", [
            'start' => "2020-01-02",
            'end' => "aaaaaaa",
            'name' => "",
            'id' => "Task 0",
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(401);
        // スケジュール作成APIの実行（startよりもendの日時が前の場合）
        $response = $this->actingAs($user)->json("POST", "api/schedule/store", [
            'start' => "2020-01-20",
            'end' => "2020-01-02",
            'name' => "",
            'id' => "Task 0",
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(401);
    }
}
