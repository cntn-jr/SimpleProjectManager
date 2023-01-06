<?php

namespace Tests\Feature\Schedule;

use App\Models\Schedule;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class updateSchedule extends TestCase
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
    public function updateSchedule()
    {
        // ユーザの作成
        $user = User::factory()->create();
        $user = User::find($user->id);
        // スケジュールの作成
        $schedule = Schedule::factory()->create([
            'start_date' => "2020-01-01",
            'end_date' => "2020-01-02",
            'title' => "title1",
        ]);
        $schedule = Schedule::find($schedule->id);
        // スケジュール(title)の更新をするAPIの実行
        $response = $this->actingAs($user)->json("PUT", "api/schedule/update", [
            'start' => "2020-01-01",
            'end' => "2020-01-02",
            'name' => "updated_title1",
            'id' => $schedule->id,
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('schedules', [
            'start_date' => "2020-01-01",
            'end_date' => "2020-01-02",
            'title' => "updated_title1",
            'id' => $schedule->id,
            'type' => "task",
            'progress' => 100,
        ]);
        // スケジュール(start_date)の更新をするAPIの実行
        $response = $this->actingAs($user)->json("PUT", "api/schedule/update", [
            'start' => "2019-11-11",
            'end' => "2020-01-02",
            'name' => "updated_title1",
            'id' => $schedule->id,
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('schedules', [
            'start_date' => "2019-11-11",
            'end_date' => "2020-01-02",
            'title' => "updated_title1",
            'id' => $schedule->id,
            'type' => "task",
            'progress' => 100,
        ]);
        // スケジュール(title)の更新をするAPIの実行
        $response = $this->actingAs($user)->json("PUT", "api/schedule/update", [
            'start' => "2020-01-01",
            'end' => "2020-01-02",
            'name' => str_repeat("a", 63),
            'id' => $schedule->id,
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('schedules', [
            'start_date' => "2020-01-01",
            'end_date' => "2020-01-02",
            'title' => str_repeat("a", 63),
            'id' => $schedule->id,
            'type' => "task",
            'progress' => 100,
        ]);
        // スケジュール(end_date)の更新をするAPIの実行
        $response = $this->actingAs($user)->json("PUT", "api/schedule/update", [
            'start' => "2019-11-11",
            'end' => "2021-05-23",
            'name' => "updated_title1",
            'id' => $schedule->id,
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('schedules', [
            'start_date' => "2019-11-11",
            'end_date' => "2021-05-23",
            'title' => "updated_title1",
            'id' => $schedule->id,
            'type' => "task",
            'progress' => 100,
        ]);
    }

    /**
     * @test
     */
    public function updateScheduleValidationFailed()
    {
        // ユーザの作成
        $user = User::factory()->create();
        $user = User::find($user->id);
        // スケジュールの作成
        $schedule = Schedule::factory()->create([
            'start_date' => "2020-01-01",
            'end_date' => "2020-01-02",
            'title' => "title1",
        ]);
        $schedule = Schedule::find($schedule->id);
        // スケジュール(titleがnullの場合)の更新をするAPIの実行
        $response = $this->actingAs($user)->json("PUT", "api/schedule/update", [
            'start' => "2020-01-01",
            'end' => "2020-01-02",
            'name' => "",
            'id' => $schedule->id,
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(401);
        // スケジュール(titleが規定文字数を超えている場合)の更新をするAPIの実行
        $response = $this->actingAs($user)->json("PUT", "api/schedule/update", [
            'start' => "2020-01-01",
            'end' => "2020-01-02",
            'name' => str_repeat("a", 64),
            'id' => $schedule->id,
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(401);
        // スケジュール(start_dateがnullの場合)の更新をするAPIの実行
        $response = $this->actingAs($user)->json("PUT", "api/schedule/update", [
            'start' => "",
            'end' => "2020-01-02",
            'name' => "title1",
            'id' => $schedule->id,
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(401);
        // スケジュール(end_dateがnullの場合)の更新をするAPIの実行
        $response = $this->actingAs($user)->json("PUT", "api/schedule/update", [
            'start' => "2020-01-01",
            'end' => "",
            'name' => "title1",
            'id' => $schedule->id,
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(401);
        // スケジュール(end_dateがstart_dateより前の場合)の更新をするAPIの実行
        $response = $this->actingAs($user)->json("PUT", "api/schedule/update", [
            'start' => "2020-01-01",
            'end' => "2019-01-01",
            'name' => "title1",
            'id' => $schedule->id,
            'type' => "task",
            'progress' => 100,
        ]);
        $response->assertStatus(401);
    }

    /**
     * @test
     */
    public function updateScheduleNotLogin()
    {
        // スケジュールの作成
        $schedule = Schedule::factory()->create([
            'start_date' => "2020-01-01",
            'end_date' => "2020-01-02",
            'title' => "title1",
        ]);
        $schedule = Schedule::find($schedule->id);
        // スケジュール(title)の更新をするAPIの実行
        $response = $this->json("PUT", "api/schedule/update", [
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
