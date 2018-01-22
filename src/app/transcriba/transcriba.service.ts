import { HttpClient } from '@angular/common/http';
import { BackendService } from '../utility/backend.service';
import { AuthService } from '../loopback-auth/auth.service';
import { User } from '../loopback-auth/user';

import { Injectable } from '@angular/core';
import { TranscribaObject } from './transcriba-object';
import { Revision } from './revision';
import { Collection } from './collection';
import { Source } from '../source/source';

@Injectable()
export class TranscribaService {

  constructor(
    private http: HttpClient,
    private backend: BackendService,
    private auth: AuthService
  ) {}

  /**
   * Returns the TranscribaObject with the given id as Promise
   */
  loadByID(id: any): Promise<TranscribaObject> {
    const token = this.auth.token;
    const url = this.backend.authUrl('TranscribaObjects/' + id, token);

    return this.http.get(url)
    .toPromise()
    .then(
      o => new TranscribaObject(
        o['title'],
        o['externalID'],
        o['sourceId'],
        o['discussionId'],
        o['id'],
        o['status'],
        o['stage'],
        o['publicTags']
      )
    );
  }

  /**
   * Get number of objects in the database
   * you can also specify a search term if you only want to
   * count objects with a title containing the search term
   * (usefull for explorer)
   */
  loadObjectCount(searchTerm?: string): Promise<number> {
      const token = this.auth.token;

      let searchFilter: string;
      if (searchTerm && searchTerm.length > 1) {
        searchFilter = 'where[title][like]=' + searchTerm;
      }else {
        searchFilter = '';
      }

      const url = this.backend.authUrl('TranscribaObjects/count', token, searchFilter);

      return this.http.get(url)
      .map(data => data['count'])
      .toPromise();
  }

  /**
   * Removes an object from the database
   */
  delete(obj: TranscribaObject): Promise<any> {
    throw new Error('not implemented yet');
  }

  /**
   * Returns all users who are considered participants of the object
   */
  loadParticipatingUsers(user: User): Promise<User[]> {
    throw new Error('not implemented yet');
  }

  /**
   * Loads a collection of objects
   */
  loadCollectionByID(id: any): Promise<Collection> {
    return Promise.resolve(Collection.createEmptyCollection());
  }

  /**
   * Imports an object by his source and his id at
   * the specified source (external id)
   */
  import(source: Source, foreignID: string): Promise<string> {
    const token = this.auth.token;
    const url = this.backend.authUrl('TranscribaObjects/import', token);

    return this.http.post(url, {
      'sourceId': source.id,
      'externalId': foreignID
    })
    .toPromise();
  }

  addObjectToCollection(target: Collection, obj: TranscribaObject): Promise<any> {
    return Promise.resolve(null);
  }

  addCollectionToCollection(target: Collection, item: Collection): Promise<any> {
    return Promise.resolve(null);
  }

  /**
   * Loads an array of objects which belong to the given page
   */
  loadObjectPage(
    page: number,
    itemsPerPage: number,
    searchTerm?: string,
    rootCollection?: Collection,
    status?: string
  ): Promise<TranscribaObject[]> {

    const token = this.auth.token;

    let filters =
      'filter[order]=createdAt DESC' +
      '&filter[limit]=' + itemsPerPage +
      '&filter[skip]=' + itemsPerPage * page;

    if (searchTerm) {
      filters += '&filter[where][title][like]=' + searchTerm;
    }

    if (status) {
      filters += '&filter[where][status]=' + status;
    }

    const url = this.backend.authUrl(
      'TranscribaObjects',
      token,
      filters
    );

    return this.http.get<Array<any>>(url)
    .timeout(5000)
    .toPromise()
    .then(
      (objects) => {
        return objects.map(
          (data) => new TranscribaObject(
            data.title,
            data.externalID,
            data.sourceId,
            data.discussionId,
            data.id,
            data.status,
            data.stage,
            data.publicTags
          )
        );
      }
    );
  }

  loadObjectPageFromCollection(page: number, itemsPerPage: number, collectionId: any, searchTerm?: string): Promise<TranscribaObject[]> {
    const token = this.auth.token;
    const url = this.backend.authUrl(
      'Collections/' + collectionId + '/transcribaObjects',
      token,
      'filter[order]=createdAt DESC' +
      // "&filter[include]=appUser"
      '&filter[limit]=' + itemsPerPage + '&filter[skip]=' + itemsPerPage * page
    );

    return this.http.get<Array<any>>(url)
    .timeout(5000)
    .toPromise()
    .then(
      (objects) => {
        return objects.map(
          (data) => {
            return new TranscribaObject(
              data['title'],
              data['externalID'],
              data['sourceId'],
              data['discussionId'],
              data['id'],
              data['status'],
              data['stage']
            );
          }
        );
      }
    );
  }

  loadCollectionPage(page: number, itemsPerPage: number, rootCollection?: Collection): Promise<Collection[]> {
    const token = this.auth.token;
    const url = this.backend.authUrl(
      'Collections',
      token,
      'filter[order]=createdAt DESC' +
      // "&filter[include]=appUser"
      '&filter[limit]=' + itemsPerPage + '&filter[skip]=' + itemsPerPage * page
    );

    return this.http.get<Array<any>>(url)
    .timeout(5000)
    .toPromise()
    .then(
      (collections) => {
        return collections.map(
          (data) => {
            return new Collection(
              data.name,
              data.description,
              data.public,
              data.locked,
              data.id
            );
          }
        );
      }
    );
  }

  /**
   * Loads the revision chronic of a TranscribaObject with the given id
   */
  loadChronic(objId: any): Promise<Array<{id: string, username: string, createdAt: string, published: boolean, approved: boolean}>> {
    const token = this.auth.token;
    const url = this.backend.authUrl('TranscribaObjects/' + objId + '/chronic', token);

    return this.http.get(url)
    .timeout(5000)
    .toPromise();
  }

  /*loadNumOfRevisions(objId: any): Promise<number>{
    return Promise.resolve(0);
  }*/

  loadLatestRevision(objId: any): Promise<Revision> {
    const token = this.auth.token;
    const url = this.backend.authUrl('TranscribaObjects/' + objId + '/latest', token);

    return this.http.get(url)
    .timeout(5000)
    .toPromise()
    .then(
        data => new Revision(
          data['id'],
          data['approved'],
          data['createdAt'],
          data['metadata'],
          data['content'],
          data['published'],
          data['ownerId']
        )
    );
  }

  /**
   * Returns the latest stable revision of an object
   */
  loadStableRevision(objId: any): Promise<Revision> {
    const token = this.auth.token;
    const url = this.backend.authUrl('TranscribaObjects/' + objId + '/stable', token);

    return this.http.get(url)
    .timeout(5000)
    .toPromise()
    .then(
        data => new Revision(
          data['id'],
          data['approved'],
          data['createdAt'],
          data['metadata'],
          data['content'],
          data['published'],
          data['ownerId']
        )
    );
  }

  /**
   * Returns the latest revision (including unpublished and not yet accepted ones)
   */
  loadLatestRevisionPermissions(objId: any): Promise<{allowVote: boolean, details: any}> {
    const token = this.auth.token;
    const url = this.backend.authUrl('TranscribaObjects/' + objId + '/latest/permissions', token);

    return this.http.get(url)
    .timeout(5000)
    .toPromise();
  }

  /**
   * If the user is in busy state then he is currently working on some object
   * revision. This method returns that object
   */
   loadCurrentlyOccupiedObject(): Promise<TranscribaObject> {
     const token = this.auth.token;
     const url = this.backend.authUrl('TranscribaObjects/occupied', token);

     return this.http.get(url)
     .timeout(5000)
     .toPromise();
   }

   isUserBusy(): Promise<boolean> {
     const token = this.auth.token;
     const url = this.backend.authUrl('AppUsers/busy', token);

     return this.http.get(url)
     .timeout(5000)
     .toPromise();
   }

   completeTutorial(): Promise<void>{
     const token = this.auth.token;
     const url = this.backend.authUrl('AppUsers/tutorial', token);

     return this.http.post<void>(url, {})
     .timeout(5000)
     .toPromise()
     .then(
       () => this.auth.reload()
     );
   }

}
