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
        return [
            'room_id' => $this->faker->numberBetween(1, 4),
            'content' => $this->faker->text(63),
        ];
    }
}
