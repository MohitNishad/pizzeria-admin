import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attribute, CategorySliceInitialState } from "@/schema/categorySlice";
import { CategorySchemaType } from "@/modules/category/schema";

const initialState: CategorySliceInitialState = {
    categoryArray: [],
    fetchedCategoryAttr: [],
    currentSelectedCategory: null,
    updatedFields: {
        name: false,
        image: false,
        price_attributes: false,
    },
};

export const CategorySlice = createSlice({
    initialState,
    name: "category",
    reducers: {
        setPriceAttribute(
            state,
            action: PayloadAction<Attribute[] | Attribute>
        ) {
            if (action.payload instanceof Array) {
                state.categoryArray = [
                    ...state.categoryArray,
                    ...action.payload,
                ];
                console.log("runned");
            } else {
                state.categoryArray = [...state.categoryArray, action.payload];
            }
        },
        updateAttribute(state, action: PayloadAction<Attribute>) {
            state.categoryArray = state.categoryArray.map((item) => {
                if (item.id === action.payload.id) {
                    // Update the properties of the matching item
                    return {
                        ...item,
                        attribute_title: action.payload.attribute_title,
                        attributes: action.payload.attributes,
                    };
                }
                return item; // Keep other items as they are
            });
        },

        deleteAttribute(state, action: PayloadAction<string>) {
            state.categoryArray = state.categoryArray.filter(
                (item) => item.id != action.payload
            );
        },

        setCurrentSelectedCategory(
            state,
            action: PayloadAction<CategorySchemaType>
        ) {
            state.currentSelectedCategory = action.payload;
        },

        mutatePriceAttr(
            state,
            action: PayloadAction<
                Attribute[] | ((arg: Attribute[]) => Attribute[])
            >
        ) {
            if (typeof action.payload == "function") {
                state.categoryArray = action.payload(state.categoryArray);
            } else {
                state.categoryArray = action.payload;
            }
        },

        setUpdatedFields(
            state,
            action: PayloadAction<"name" | "image" | "price_attributes">
        ) {
            switch (action.payload) {
                case "image":
                    state.updatedFields.image = true;
                    break;
                case "name":
                    state.updatedFields.name = true;
                    break;
                case "price_attributes":
                    state.updatedFields.price_attributes = true;
                    break;
                default:
                    null;
            }
        },
    },
});

export const {
    setPriceAttribute,
    updateAttribute,
    deleteAttribute,
    mutatePriceAttr,
    setUpdatedFields,
    setCurrentSelectedCategory,
} = CategorySlice.actions;
