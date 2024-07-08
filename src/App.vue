<script setup>
    import { computed, provide, ref, watch } from 'vue';
    import Drawer from 'components/Drawer.vue';
    import Header from 'components/Header.vue';

    /* Cart (START) */
    const cartItems = ref([]);
    const drawerIsOpen = ref(false);

    const totalPrice = computed(() => cartItems.value.reduce((acc, item) => acc + item.price, 0));
    const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100));

    const closeDrawer = () => {
        drawerIsOpen.value = false;
    };
    const openDrawer = () => {
        drawerIsOpen.value = true;
    };

    const addToCart = (item) => {
        cartItems.value.push(item);
        item.isAdded = true;
    };

    const removeFromCart = (item) => {
        cartItems.value.splice(cartItems.value.indexOf(item), 1);
        item.isAdded = false;
    };

    watch(
        cartItems,
        () => {
            localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
        },
        { deep: true }
    );

    provide('cart', {
        cartItems,
        closeDrawer,
        openDrawer,
        addToCart,
        removeFromCart,
    });
    /* Cart (END) */
</script>

<template>
    <Drawer v-if="drawerIsOpen" :total-price="totalPrice" :vat-price="vatPrice" />

    <div class="m-auto mt-14 w-4/5 rounded-xl bg-white shadow-xl">
        <Header :total-price="totalPrice" @open-drawer="openDrawer" />

        <div class="p-10">
            <router-view></router-view>
        </div>
    </div>
</template>
