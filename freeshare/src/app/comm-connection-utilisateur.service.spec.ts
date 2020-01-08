import { TestBed } from '@angular/core/testing';

import { CommConnectionUtilisateurService } from './comm-connection-utilisateur.service';

describe('CommConnectionUtilisateurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommConnectionUtilisateurService = TestBed.get(CommConnectionUtilisateurService);
    expect(service).toBeTruthy();
  });
});
