/**
 * Gallery data and navigation logic for the lightbox component.
 */

const galleryData = [
    {
        src: 'imagens/image (2).png',
        title: 'Cardápio: Hambúrgueres Clássicos',
        desc: 'Conheça nossos clássicos como X-Burguer, X-Portuguesa, Hambúrguer Simples, Bauru e Misto Quente, disponíveis nas linhas Tradicional, Premium e Picanha.'
    },
    {
        src: 'imagens/image (5).png',
        title: 'Cardápio: Lanches Tradicionais',
        desc: 'Opções tradicionais de lanches no pão artesanal: X-Mignon, X-Galinha, X-Coração, X-Bacon, X-Egg Especial, X-Egg simples, X-Especial e X-Salada.'
    },
    {
        src: 'imagens/image (6).png',
        title: 'Cardápio: Linha X-Bendito Especial',
        desc: 'Nossos lanches da linha premium gigante: X-Bendito Especial (frango, coração, calabresa, bacon, mignon, ovo, salsicha, fritas), X-Bendito tradicional e X-Mignon Especial.'
    },
    {
        src: 'imagens/image (7).png',
        title: 'Cardápio: Gourmet Especiais & Adicionais',
        desc: 'Burgers Especiais como Bacon, Duplo, Tsunami (cebola caramelizada), Bomba de Cheddar, Ciclone (cebola crispy), Tornado (abacaxi com geléia de pimenta), Gourmet Doce (Morango com Nutella) e lista de adicionais.'
    },
    {
        src: 'imagens/image (1).png',
        title: 'Cardápio: Gourmet & Big Torradas',
        desc: 'Ingredientes e preços das nossas famosas Big Torradas (Frango, Nutella, Mignon) e a linha Gourmet (Burguer, Salada, Cebola).'
    },
    {
        src: 'imagens/image (9).png',
        title: 'Cardápio: Opções da Casa',
        desc: 'Lanches diferenciados como X-Vegetariano (com palmito), X-Cebolitos, X-Calabresa, X-Cowboy (com 3 hambúrgueres e salsicha) e X-Dog completo.'
    },
    {
        src: 'imagens/image (8).png',
        title: 'Cardápio: Porções & Acompanhamentos',
        desc: 'Preços das porções completas da casa: Fritas com queijo/cheddar, Picadão completo, Polenta, Aipim frito, Calabresa acebolada, Isca de Peixe, Mignon, Alcatra, Frango e Coração.'
    },
    {
        src: 'imagens/image (3).png',
        title: 'Cardápio: Sucos & Refrigerantes',
        desc: 'Sucos naturais, refrigerantes, águas, copos de gelo e opções não alcoólicas da casa para acompanhar seu lanche.'
    },
    {
        src: 'imagens/image (4).png',
        title: 'Cardápio: Cervejas, Chopp & Batidas',
        desc: 'Confira nossa carta de cervejas e chopp (Heineken, Brahma, Skol, Original, Budweiser) e batidas artesanais (Morango, Maracujá, Vinho).'
    }
];

function getNextIndex(currentIdx, length) {
    return (currentIdx + 1) % length;
}

function getPrevIndex(currentIdx, length) {
    return (currentIdx - 1 + length) % length;
}

function getGalleryItem(index) {
    if (index < 0 || index >= galleryData.length) {
        return null;
    }
    return galleryData[index];
}

module.exports = { galleryData, getNextIndex, getPrevIndex, getGalleryItem };
