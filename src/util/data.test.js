import { types } from 'sharetribe-sdk';
import {
  combinedRelationships,
  combinedResourceObjects,
  updatedEntities,
  denormalisedEntities,
} from './data';

const { UUID } = types;

describe('data utils', () => {
  describe('combinedRelationships()', () => {
    it('handles no rels', () => {
      expect(combinedRelationships(undefined, undefined)).toEqual(null);
    });

    it('takes existings rels if no new rels are given', () => {
      const listingRels = {
        author: { data: { id: new UUID('author-id'), type: 'author' } },
        images: {
          data: [
            { id: new UUID('image1'), type: 'image' },
            { id: new UUID('image2'), type: 'image' },
          ],
        },
      };
      expect(combinedRelationships(listingRels, undefined)).toEqual(listingRels);
    });

    it('takes new rels if no existing rels are given', () => {
      const listingRels = {
        author: { data: { id: new UUID('author-id'), type: 'author' } },
        images: { data: { id: new UUID('image1'), type: 'image' } },
      };
      expect(combinedRelationships(undefined, listingRels)).toEqual(listingRels);
    });

    it('merges two nonempty rels', () => {
      const authorRel = { data: { id: new UUID('author-id'), type: 'author' } };
      const imagesRel = {
        data: [
          { id: new UUID('image1'), type: 'image' },
          { id: new UUID('image2'), type: 'image' },
        ],
      };
      const newImagesRel = { data: { id: new UUID('image1'), type: 'image' } };
      const reviewsRel = {
        data: [
          { id: new UUID('review1'), type: 'review' },
          { id: new UUID('review2'), type: 'review' },
        ],
      };

      const oldListingRels = { author: authorRel, images: imagesRel };
      const newListingRels = { images: newImagesRel, reviews: reviewsRel };
      expect(combinedRelationships(oldListingRels, newListingRels)).toEqual({
        author: authorRel,
        images: newImagesRel,
        reviews: reviewsRel,
      });
    });
  });

  describe('combinedResourceObjects()', () => {
    it("throws if ids don't match", () => {
      const listing1 = { id: new UUID('listing1'), type: 'listing' };
      const listing2 = { id: new UUID('listing2'), type: 'listing' };
      expect(() => combinedResourceObjects(listing1, listing2)).toThrow(
        'Cannot merge resource objects with different ids or types',
      );
    });

    it("throws if types don't match", () => {
      const listing1 = { id: new UUID('listing1'), type: 'listing' };
      const author1 = { id: new UUID('author1'), type: 'author' };
      expect(() => combinedResourceObjects(listing1, author1)).toThrow(
        'Cannot merge resource objects with different ids or types',
      );
    });

    it("doesn't add attributes or relationships keys unnecessarily", () => {
      const res1 = { id: new UUID('listing1'), type: 'listing' };
      const res2 = { id: new UUID('listing1'), type: 'listing' };
      const merged = combinedResourceObjects(res1, res2);
      expect(merged).toEqual(res1);
      const keys = Object.keys(merged).sort();
      expect(keys).toEqual(['id', 'type']);
    });

    it('merges new attributes', () => {
      const res1 = {
        id: new UUID('listing1'),
        type: 'listing',
        attributes: { title: 'Listing 1 title', description: 'Listing 1 description' },
      };
      const res2 = {
        id: new UUID('listing1'),
        type: 'listing',
        attributes: { title: 'Changed title', description: 'Some description' },
      };
      expect(combinedResourceObjects(res1, res2)).toEqual(res2);
    });

    it("keeps old attributes if new does't have any", () => {
      const res1Attributes = { title: 'Listing 1 title', description: 'Listing 1 description' };
      const res2Relationships = { author: { data: { id: new UUID('author1'), type: 'author' } } };

      const res1 = { id: new UUID('listing1'), type: 'listing', attributes: res1Attributes };
      const res2 = { id: new UUID('listing1'), type: 'listing', relationships: res2Relationships };
      expect(combinedResourceObjects(res1, res2)).toEqual({
        id: new UUID('listing1'),
        type: 'listing',
        attributes: res1Attributes,
        relationships: res2Relationships,
      });
    });
  });

  describe('updatedEntities()', () => {
    it('adds a single entity', () => {
      const listing1 = { id: new UUID('listing1'), type: 'listing' };
      const response = { data: listing1 };
      const entities = updatedEntities({}, response);
      expect(entities).toEqual({ listing: { listing1 } });
    });

    it('add multiple entities', () => {
      const listing1 = { id: new UUID('listing1'), type: 'listing' };
      const listing2 = { id: new UUID('listing2'), type: 'listing' };
      const response = { data: [listing1, listing2] };
      const entities = updatedEntities({}, response);
      expect(entities).toEqual({ listing: { listing1, listing2 } });
    });

    it('handles a more complex merge', () => {
      const listing1 = {
        id: new UUID('listing1'),
        type: 'listing',
        attributes: { title: 'Listing 1 title', description: 'Listing 1 description' },
      };
      const listing2 = {
        id: new UUID('listing2'),
        type: 'listing',
        attributes: { title: 'Listing 2 title', description: 'Listing 2 description' },
      };
      const initialResponse = { data: [listing1, listing2] };
      const initialEntities = updatedEntities({}, initialResponse);
      expect(initialEntities).toEqual({ listing: { listing1, listing2 } });
      const author1 = { id: new UUID('author1'), type: 'author' };
      const author1WithAttributes = {
        id: new UUID('author1'),
        type: 'author',
        attributes: { name: 'Author 1 name' },
      };
      const listing2Updated = {
        id: new UUID('listing2'),
        type: 'listing',
        attributes: { title: 'New listing 2 title', description: 'new listing 2 description' },
        relationships: { author: { data: author1 } },
      };
      const included = [author1WithAttributes];
      const response = { data: [listing2Updated], included };
      const entities = updatedEntities(initialEntities, response, true);
      expect(entities).toEqual({
        listing: { listing1, listing2: listing2Updated },
        author: { author1: author1WithAttributes },
      });
    });
  });

  describe('denormalisedEntities()', () => {
    const createListing = id => ({
      id: new UUID(id),
      type: 'listing',
      attributes: { title: `Listing ${id} title`, description: `Listing ${id} description` },
    });

    const createUser = id => ({
      id: new UUID(id),
      type: 'user',
      attributes: { name: `User ${id} name` },
    });

    const createImage = id => ({
      id: new UUID(id),
      type: 'image',
      attributes: { url: `https://example.com/${id}.jpg`, width: 300, height: 200 },
    });

    it('return no results with empty ids', () => {
      const entities = { listing: { listing1: createListing('listing1') } };
      expect(denormalisedEntities(entities, 'listing', [])).toEqual([]);
    });

    it('return no results with empty entities and empty ids', () => {
      const entities = {};
      expect(denormalisedEntities(entities, 'listing', [])).toEqual([]);
    });

    it('throws when selecting a nonexistent type', () => {
      const entities = { listing: { listing1: createListing('listing1') } };
      expect(() => denormalisedEntities(entities, 'user', [new UUID('user1')])).toThrow(
        'No entities of type user',
      );
    });

    it('throws when selecting a nonexistent id', () => {
      const entities = { listing: { listing1: createListing('listing1') } };
      const ids = [new UUID('listing2')];
      expect(() => denormalisedEntities(entities, 'listing', ids)).toThrow(
        'Entity listing with id listing2 not found',
      );
    });

    it('throws if a related entity is not found', () => {
      const listing1 = createListing('listing1');
      listing1.relationships = { author: { data: createUser('user1') } };
      const entities = { listing: { listing1 } };
      const ids = [listing1.id];
      expect(() => denormalisedEntities(entities, 'listing', ids)).toThrow(
        'No entities of type user',
      );
    });

    it('returns the selected entities', () => {
      const listing1 = createListing('listing1');
      const listing2 = createListing('listing2');
      const listing3 = createListing('listing3');

      const entities = { listing: { listing1, listing2, listing3 } };
      const ids = [listing1.id, listing3.id];
      expect(denormalisedEntities(entities, 'listing', ids)).toEqual([listing1, listing3]);
    });

    it('denormalises simple relationships', () => {
      const user1 = createUser('user1');
      const listing1 = createListing('listing1');
      const listing1Relationships = { author: { data: user1 } };
      const listing1WithRelationships = { ...listing1, relationships: listing1Relationships };
      const listing2 = createListing('listing2');
      const entities = {
        listing: { listing1: listing1WithRelationships, listing2 },
        user: { user1 },
      };
      const ids = [listing1.id];
      expect(denormalisedEntities(entities, 'listing', ids)).toEqual([
        { ...listing1, author: user1 },
      ]);
    });

    it('denormalises multiple relationships', () => {
      const user1 = createUser('user1');
      const image1 = createImage('image1');
      const image2 = createImage('image2');
      const listing1 = createListing('listing1');
      const listing1Relationships = {
        author: { data: user1 },
        images: { data: [image1, image2] },
      };
      const listing1WithRelationships = { ...listing1, relationships: listing1Relationships };
      const listing2 = createListing('listing2');
      const listing3 = createListing('listing3');
      const entities = {
        listing: { listing1: listing1WithRelationships, listing2, listing3 },
        user: { user1 },
        image: { image1, image2 },
      };
      const ids = [listing1.id, listing2.id];

      expect(denormalisedEntities(entities, 'listing', ids)).toEqual([
        { ...listing1, author: user1, images: [image1, image2] },
        listing2,
      ]);
    });
  });
});