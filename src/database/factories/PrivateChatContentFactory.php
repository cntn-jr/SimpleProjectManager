<?php

namespace Database\Factories;

use App\Models\PrivateChatContent;
use Illuminate\Database\Eloquent\Factories\Factory;

class PrivateChatContentFactory extends Factory
{

    protected $model = PrivateChatContent::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $content_num = $this->faker->numberBetween(10, 20);
        $created_at = $this->faker->dateTimeBetween("-6month", "+6month");
        return [
            'room_id' => $this->faker->numberBetween(1, 55),
            'content' => $this->faker->realText($content_num),
            'created_at' => $created_at,
            'updated_at' => $created_at,
        ];
    }
}
