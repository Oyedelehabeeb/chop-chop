import { defineQuery } from "groq";

export const getAllRestaurantsQuery = defineQuery(
  `*[_type == "restaurant"] {
    _id,
    name,
    description,
    logo,
    coverImage,
    location,
    cuisineType,
    approved,
    createdAt,
    updatedAt,
    owner->{
        _ref,
        _type,
    },
    }`
);
