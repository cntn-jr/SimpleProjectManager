<?php

namespace Tests\Feature\PrivateChat;

use App\Models\PrivateChatContent;
use App\Models\PrivateChatRoom;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class createContent extends TestCase
{
    // テスト開始前にマイグレーションを実行する
    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate:refresh');
    }

    // テスト終了後にマイグレーションを実行する
    public function tearDown(): void
    {
        parent::setUp();
        $this->artisan('migrate:refresh --seed');
    }

    /**
     * @test
     */
    public function createContent()
    {
        // ユーザの作成
        $user1 = User::factory()->create([
            "last_name" => "last1",
            "first_name" => "first1",
        ]);
        $user1 = User::find($user1->id);
        $user2 = User::factory()->create([
            "last_name" => "last2",
            "first_name" => "first2",
        ]);
        $user2 = User::find($user2->id);
        // チャットルームの作成
        $room_id = 1;
        $room1 = PrivateChatRoom::factory()->create([
            "id" => $room_id++,
            "user1_id" => $user1->id,
            "user2_id" => $user2->id,
            'created_at' => "2022-01-10 00:00:00",
            'updated_at' => "2022-01-10 00:00:00",
        ]);
        // チャットを保存するAPIの実行
        $response = $this->actingAs($user1)->json('POST', 'api/room/content/store', [
            "room_id" => $room1->id,
            "user_id" => $user1->id,
            "content" => "content1",
        ]);
        $response->assertStatus(200);
        $response = $this->actingAs($user2)->json('POST', 'api/room/content/store', [
            "room_id" => $room1->id,
            "user_id" => $user2->id,
            "content" => "content2",
        ]);
        $response->assertStatus(200);
        $response = $this->actingAs($user2)->json('POST', 'api/room/content/store', [
            "room_id" => $room1->id,
            "user_id" => $user2->id,
            "content" => str_repeat("a", 63),
        ]);
        $response->assertStatus(200);
        // 上記で作成したデータがデータベースに存在するかチェック
        $this->assertDatabaseHas('private_chat_contents', [
            "room_id" => $room1->id,
            "user_id" => $user1->id,
            "content" => "content1",
        ]);
        $this->assertDatabaseHas('private_chat_contents', [
            "room_id" => $room1->id,
            "user_id" => $user2->id,
            "content" => "content2",
        ]);
        $this->assertDatabaseHas('private_chat_contents', [
            "room_id" => $room1->id,
            "user_id" => $user2->id,
            "content" => str_repeat("a", 63),
        ]);
    }

    /**
     * @test
     */
    public function createChatContentByNotLoginUser()
    {
        // ユーザの作成
        $user1 = User::factory()->create([
            "last_name" => "last1",
            "first_name" => "first1",
        ]);
        $user1 = User::find($user1->id);
        $user2 = User::factory()->create([
            "last_name" => "last2",
            "first_name" => "first2",
        ]);
        $user2 = User::find($user2->id);
        // チャットルームの作成
        $room_id = 1;
        $room1 = PrivateChatRoom::factory()->create([
            "id" => $room_id++,
            "user1_id" => $user1->id,
            "user2_id" => $user2->id,
            'created_at' => "2022-01-10 00:00:00",
            'updated_at' => "2022-01-10 00:00:00",
        ]);
        // ログインしていない状態でAPIの実行
        $response = $this->json('POST', 'api/room/content/store', [
            "room_id" => $room1->id,
            "user_id" => $user2->id,
            "content" => "content2",
        ]);
        $response->assertStatus(401);
    }

    /**
     * @test
     */
    public function createChatContentValidationFailed()
    {
        // ユーザの作成
        $user1 = User::factory()->create([
            "last_name" => "last1",
            "first_name" => "first1",
        ]);
        $user1 = User::find($user1->id);
        $user2 = User::factory()->create([
            "last_name" => "last2",
            "first_name" => "first2",
        ]);
        $user2 = User::find($user2->id);
        // チャットルームの作成
        $room_id = 1;
        $room1 = PrivateChatRoom::factory()->create([
            "id" => $room_id++,
            "user1_id" => $user1->id,
            "user2_id" => $user2->id,
            'created_at' => "2022-01-10 00:00:00",
            'updated_at' => "2022-01-10 00:00:00",
        ]);
        // チャットを保存するAPIの実行（存在しないroom_idの場合）
        $response = $this->actingAs($user1)->json('POST', 'api/room/content/store', [
            "room_id" => 0,
            "user_id" => $user1->id,
            "content" => "content1",
        ]);
        $response->assertStatus(401);
        // チャットを保存するAPIの実行（contentが文字数の最大を超えている場合）
        $response = $this->actingAs($user1)->json('POST', 'api/room/content/store', [
            "room_id" => 0,
            "user_id" => $user1->id,
            "content" => str_repeat("a", 64),
        ]);
        $response->assertStatus(401);
    }
}
