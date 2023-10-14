import {renderHook} from '@testing-library/react-hooks';
import {ProviderNotes, useNotes} from '../src/hooks/useProviderNotes';
import {it, describe, expect} from '@jest/globals';

describe('useNotes', () => {
  it('should throw an error outside of ProviderNotes', () => {
    const {result} = renderHook(() => useNotes());
    expect(result.error).toEqual(
      new Error('store must be used within a ProviderNotes'),
    );
  });

  it('should provide notes and addNotes function inside ProviderNotes', () => {
    const {result} = renderHook(() => useNotes(), {
      wrapper: ProviderNotes,
    });
    const {notes, addNotes} = result.current;

    expect(notes).toEqual([]);
    expect(typeof addNotes).toBe('function');
  });
});
