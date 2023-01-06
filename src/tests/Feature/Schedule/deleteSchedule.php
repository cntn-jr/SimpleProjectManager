<?php

namespace Tests\Feature\Schedule;

use App\Models\Schedule;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class deleteSchedule extends TestCase
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
    public function deleteSchedule()
    {
        // ユーザの作成
        $user = User::factory()->create();
        $user = User::find($user->id);
        // スケジュールの作成
        $schedule = Schedule::factory()->create();
        $schedule = Schedule::find($schedule->id);
        // スケジュールの削除をするAPIの実行
        $response = $this->actingAs($user)->json("PUT", "api/schedule/delete", [
            'start' => "2020-01-01",
            'end' => "2020-01-02",
            'name' => "updated_title1",
            'id' => $schedule->id,
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(200);
        $this->assertSoftDeleted($schedule);
    }

    /**
     * @test
     */
    public function deleteNotExitSchedule()
    {
        // スケジュールの作成
        $schedule = Schedule::factory()->create();
        $schedule = Schedule::find($schedule->id);
        // スケジュールの削除をするAPIの実行
        $response = $this->json("PUT", "api/schedule/delete", [
            'start' => "2020-01-01",
            'end' => "2020-01-02",
            'name' => "updated_title1",
            'id' => $schedule->id + 1,
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(401);
    }

    /**
     * @test
     */
    public function deleteScheduleByNotLoginUser()
    {
        // スケジュールの作成
        $schedule = Schedule::factory()->create();
        $schedule = Schedule::find($schedule->id);
        // スケジュールの削除をするAPIの実行
        $response = $this->json("PUT", "api/schedule/delete", [
            'start' => "2020-01-01",
            'end' => "2020-01-02",
            'name' => "updated_title1",
            'id' => $schedule->id,
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(401);
    }
}
