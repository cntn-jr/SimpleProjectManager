<?php

namespace Tests\Feature\Task;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class createTask extends TestCase
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
    public function createTaskByLoginUser()
    {
        // ユーザの作成
        $user = User::factory()->create();
        $user = User::find($user->id);
        // タスク作成APIの実行
        $response = $this->actingAs($user)->json("POST", "api/task/store", [
            'title' => "title1",
            'due' => "2022-03-06",
            'priority' => "high",
            'description' => "description1",
        ]);
        $response->assertStatus(200);
        $response = $this->actingAs($user)->json("POST", "api/task/store", [
            'title' => "title2",
            'due' => "2022-12-11",
            'priority' => "middle",
            'description' => "description2",
        ]);
        $response->assertStatus(200);
        $response = $this->actingAs($user)->json("POST", "api/task/store", [
            'title' => "title3",
            'due' => "2022-02-14",
            'priority' => "low",
            'description' => "",
        ]);
        $response->assertStatus(200);
        // 上記のAPIで作成使用したデータがデータベースに存在するかチェック
        $this->assertDatabaseHas('task', [
            'title' => "title1",
            'due' => "2022-03-06",
            'priority' => "high",
            'description' => "description1",
        ]);
        $this->assertDatabaseHas('task', [
            'title' => "title2",
            'due' => "2022-12-11",
            'priority' => "middle",
            'description' => "description2",
        ]);
        $this->assertDatabaseHas('task', [
            'title' => "title3",
            'due' => "2022-02-14",
            'priority' => "low",
            'description' => null,
        ]);
    }

    /**
     * @test
     */
    public function createTaskByNotLoginUser()
    {
        // タスク作成APIの実行
        $response = $this->json("POST", "api/task/store", [
            'title' => "title1",
            'due' => "2022-03-06",
            'priority' => "high",
            'description' => "description1",
        ]);
        $response->assertStatus(401);
    }
}
