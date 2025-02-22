const { createApp, ref } = Vue;

createApp({
    setup() {
        const players = ref([
            {name: 'Саша', score: 0},
            {name: 'Гузель', score: 0},
        ]);
        const isScoreModalOpen = ref(false);
        const isAddPlayerModalOpen = ref(false);
        const isEditModalOpen = ref(false);
        const currentPlayerIndex = ref(null);
        const modalType = ref('');
        const newPlayerName = ref('');
        const editPlayerName = ref('');

        const openModal = (type, index) => {
            modalType.value = type;
            currentPlayerIndex.value = index;
            isScoreModalOpen.value = true;
        };

        const openAddPlayerModal = () => {
            isAddPlayerModalOpen.value = true;
        };

        const openEditModal = (index) => {
            currentPlayerIndex.value = index;
            editPlayerName.value = players.value[index].name;
            isEditModalOpen.value = true;
        };

        const closeModal = () => {
            isScoreModalOpen.value = false;
            isAddPlayerModalOpen.value = false;
            isEditModalOpen.value = false;
            modalType.value = '';
            currentPlayerIndex.value = null;
            newPlayerName.value = '';
            editPlayerName.value = '';
        };

        const updateScore = (num) => {
            if (modalType.value === 'increase') {
                players.value[currentPlayerIndex.value].score += num;
            } else if (modalType.value === 'decrease') {
                players.value[currentPlayerIndex.value].score -= num;
            }
            closeModal();
        };

        const addPlayer = () => {
            if (newPlayerName.value.trim()) {
                players.value.push({ name: newPlayerName.value.trim(), score: 0 });
                closeModal();
            }
        };

        const saveEdit = () => {
            if (editPlayerName.value.trim()) {
                players.value[currentPlayerIndex.value].name = editPlayerName.value.trim();
                closeModal();
            }
        };

        const deletePlayer = () => {
            players.value.splice(currentPlayerIndex.value, 1);
            closeModal();
        };

        return {
            players,
            isScoreModalOpen,
            isAddPlayerModalOpen,
            isEditModalOpen,
            newPlayerName,
            editPlayerName,
            openModal,
            openAddPlayerModal,
            openEditModal,
            closeModal,
            updateScore,
            addPlayer,
            saveEdit,
            deletePlayer
        };
    }
}).mount('#app');