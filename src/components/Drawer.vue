<script setup>
    import axios from 'axios';
    import { computed, inject, ref } from 'vue';
    import CartItemList from './CartItemList.vue';
    import DrawerHead from './DrawerHead.vue';
    import InfoBlock from './InfoBlock.vue';

    const props = defineProps({
        totalPrice: Number,
        vatPrice: Number,
    });

    const { cartItems, closeDrawer } = inject('cart');

    const isCreating = ref(false);
    const orderId = ref(null);

    const createOrder = async () => {
        try {
            isCreating.value = true;

            const { data } = await axios.post(`https://763c6f204bf60b83.mokky.dev/orders`, {
                items: cartItems.value,
                totalPrice: props.totalPrice,
            });

            cartItems.value = [];

            orderId.value = data.id;
        } catch (err) {
            console.log(err);
        } finally {
            isCreating.value = false;
        }
    };

    const cartIsEmpty = computed(() => cartItems.value.length === 0);
    const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value);
</script>

<template>
    <div
        class="fixed left-0 top-0 z-10 h-full w-full bg-black opacity-70"
        @click="closeDrawer"
    ></div>
    <div class="fixed right-0 top-0 z-20 h-full w-96 bg-white p-8">
        <DrawerHead />

        <div class="flex h-full items-center" v-if="!totalPrice || orderId">
            <InfoBlock
                v-if="!totalPrice && !orderId"
                title="Cart is empty"
                description="Add at least one product to place an order."
                image-url="/package-icon.png"
            />
            <InfoBlock
                v-if="orderId"
                title="Order placed!"
                :description="`Your order #${orderId} will soon be handed over to the courier service.`"
                image-url="/order-success-icon.png"
            />
        </div>

        <div v-else>
            <CartItemList />

            <div class="mt-7 flex flex-col gap-4">
                <div class="flex gap-2">
                    <span>Total:</span>
                    <div class="flex-1 border-b border-dashed"></div>
                    <b>{{ totalPrice }} $</b>
                </div>

                <div class="flex gap-2">
                    <span>Tax 5%:</span>
                    <div class="flex-1 border-b border-dashed"></div>
                    <b>{{ vatPrice }} $</b>
                </div>

                <button
                    class="mt-4 w-full cursor-pointer rounded-xl bg-lime-500 py-3 text-white transition hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300"
                    :disabled="buttonDisabled"
                    @click="createOrder"
                >
                    Checkout
                </button>
            </div>
        </div>
    </div>
</template>
