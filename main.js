const { createApp, ref } = Vue;

createApp({
    setup() {
        const players = ref([]);
        const isScoreModalOpen = ref(false);
        const isAddPlayerModalOpen = ref(false);
        const isEditModalOpen = ref(false);
        const isMenuOpen = ref(false);
        const currentPlayerIndex = ref(null);
        const modalType = ref('');
        const newPlayerName = ref('');
        const editPlayerName = ref('');
        const startScore = ref(100);

        const openModal = (type, index) => {
            modalType.value = type;
            currentPlayerIndex.value = index;
            isScoreModalOpen.value = true;
        };

        const openMenu = () => {
            isMenuOpen.value = true;
        };

        const closeMenu = () => {
            isMenuOpen.value = false;
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
            isMenuOpen.value = false;
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

        const resetPlayers = () => {
            for (const player of players.value) {
                player.score = 0;
            }
            closeModal();
        };

        const setPlayersPreset = (preset) => {
            const newPlayers = [];
            for (const letter of preset) {
                if (letter === 'a') {
                    newPlayers.push({name: 'Александр', score: 0});
                } else if (letter === 'e') {
                    newPlayers.push({name: 'Елена', score: 0});
                } else if (letter === 'g') {
                    newPlayers.push({name: 'Гузель', score: 0});
                } else if (letter === 's') {
                    newPlayers.push({name: 'Сергей', score: 0});
                }
            }

            players.value = newPlayers;
            closeModal();
        };

        const setStartScore = () => {
            for (const player of players.value) {
                console.log(player, startScore.value);
                player.score = startScore.value;
            }
            closeModal();
        }

        return {
            players,
            isScoreModalOpen,
            isAddPlayerModalOpen,
            isEditModalOpen,
            newPlayerName,
            editPlayerName,
            isMenuOpen,
            startScore,
            openModal,
            openAddPlayerModal,
            openEditModal,
            closeModal,
            openMenu,
            resetPlayers,
            closeMenu,
            updateScore,
            addPlayer,
            saveEdit,
            deletePlayer,
            setPlayersPreset,
            setStartScore,
        };
    }
}).mount('#app');