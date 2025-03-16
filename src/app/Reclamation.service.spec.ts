import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReclamationService } from './Reclamation.service';

describe('tacheService', () => {
  let service: ReclamationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importez HttpClientTestingModule ici
      providers: [ReclamationService]
    });

    service = TestBed.inject(ReclamationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'il n'y a pas de requêtes en attente
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
})