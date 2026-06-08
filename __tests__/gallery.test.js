const {
    galleryData,
    getNextIndex,
    getPrevIndex,
    getGalleryItem
} = require('../src/gallery');

describe('galleryData', () => {
    it('should contain 9 gallery items', () => {
        expect(galleryData).toHaveLength(9);
    });

    it('should have src, title, and desc for every item', () => {
        galleryData.forEach((item, i) => {
            expect(item).toHaveProperty('src');
            expect(item).toHaveProperty('title');
            expect(item).toHaveProperty('desc');
            expect(typeof item.src).toBe('string');
            expect(typeof item.title).toBe('string');
            expect(typeof item.desc).toBe('string');
            expect(item.src.length).toBeGreaterThan(0);
            expect(item.title.length).toBeGreaterThan(0);
            expect(item.desc.length).toBeGreaterThan(0);
        });
    });

    it('should reference images in the imagens/ directory', () => {
        galleryData.forEach((item) => {
            expect(item.src).toMatch(/^imagens\//);
        });
    });

    it('should have unique src paths', () => {
        const srcs = galleryData.map((item) => item.src);
        expect(new Set(srcs).size).toBe(srcs.length);
    });

    it('should have unique titles', () => {
        const titles = galleryData.map((item) => item.title);
        expect(new Set(titles).size).toBe(titles.length);
    });
});

describe('getNextIndex', () => {
    it('should advance index by 1', () => {
        expect(getNextIndex(0, 9)).toBe(1);
        expect(getNextIndex(4, 9)).toBe(5);
    });

    it('should wrap around from last to first', () => {
        expect(getNextIndex(8, 9)).toBe(0);
    });

    it('should handle single-item gallery', () => {
        expect(getNextIndex(0, 1)).toBe(0);
    });

    it('should handle two-item gallery', () => {
        expect(getNextIndex(0, 2)).toBe(1);
        expect(getNextIndex(1, 2)).toBe(0);
    });
});

describe('getPrevIndex', () => {
    it('should go back by 1', () => {
        expect(getPrevIndex(5, 9)).toBe(4);
        expect(getPrevIndex(1, 9)).toBe(0);
    });

    it('should wrap around from first to last', () => {
        expect(getPrevIndex(0, 9)).toBe(8);
    });

    it('should handle single-item gallery', () => {
        expect(getPrevIndex(0, 1)).toBe(0);
    });

    it('should handle two-item gallery', () => {
        expect(getPrevIndex(0, 2)).toBe(1);
        expect(getPrevIndex(1, 2)).toBe(0);
    });
});

describe('getGalleryItem', () => {
    it('should return the correct item for a valid index', () => {
        const item = getGalleryItem(0);
        expect(item).toBe(galleryData[0]);
        expect(item.title).toBe('Cardápio: Hambúrgueres Clássicos');
    });

    it('should return the last item', () => {
        const item = getGalleryItem(8);
        expect(item).toBe(galleryData[8]);
        expect(item.title).toBe('Cardápio: Cervejas, Chopp & Batidas');
    });

    it('should return null for negative index', () => {
        expect(getGalleryItem(-1)).toBeNull();
    });

    it('should return null for out-of-bounds index', () => {
        expect(getGalleryItem(9)).toBeNull();
        expect(getGalleryItem(100)).toBeNull();
    });
});
