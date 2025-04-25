import React from 'react'
import {Card, CardHeader, CardBody, Image} from "@heroui/react";
import test from '../../src/images/test.png';
import complet from '../../src/images/complet.png';
import illimite from '../../src/images/illimite.png';
import '../../src/styles/PaiementCard.css';

const PaiementCard = () => {
    return (
        <>
          {/* Inline CSS for blur effect on non-hovered cards */}
          <style>{`
            .cards-container:hover .card-wrapper:not(:hover) {
              filter: blur(1.5px);
              transition: filter 0.5s ease 0.2s;
            }
          `}</style>
    
            <div className="cards-container grid grid-cols-1 justify-items-center sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-3 gap-16 py-8">
            {/* Card 1 */}
            <div className="card-wrapper group w-[300px]">
              <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-[3px] rounded-2xl transition-transform duration-300 transform group-hover:scale-110">
                <Card className="py-6 bg-white rounded-xl shadow-lg">
                  <CardHeader className="pb-0 pt-4 px-6 flex-col items-start">
                  <p className="text-tiny uppercase font-bold">Phase d'essai</p>
                    <small className="text-default-500">Tres Limitee</small>
                    <h2 className="font-bold text-xl mt-2">Gratuit</h2>
                    <ul className="list-disc list-inside mt-2 text-sm">
                        <li className="mt-1">Limite 1 approbation par jour</li>
                        <li className="mt-1">Access OTP non authorizer</li>
                        <li className="mt-1">Limite 3 message par jour</li>
                    </ul>
                  </CardHeader>
                  <CardBody className="overflow-visible py-4">
                    <Image
                      alt="Test Plan"
                      className="object-cover rounded-xl"
                      src={test}
                      width={300}
                    />
                  </CardBody>
                  <button class="cssbuttons-io-button">
                    Poursuivre
                    <div class="icon">
                      <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                          d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </button>
                  </Card>
              </div>
            </div>
    
            {/* Card 2 */}
            <div className="card-wrapper group w-[300px]">
              <div className="bg-gradient-to-br from-indigo-400 to-blue-500 p-[3px] rounded-2xl transition-transform duration-300 transform group-hover:scale-110">
                <Card className="py-6 bg-white rounded-xl shadow-lg">
                  <CardHeader className="pb-0 pt-4 px-6 flex-col items-start">
                  <p className="text-tiny uppercase font-bold highlight bg-purple-200" style={{ padding: '5px', borderRadius: '4px', fontStyle: 'italic' }}>Plus populaire</p>
                    <small className="text-default-500">Complet</small>
                    <h2 className="font-bold text-xl mt-2">1000 $ / mois</h2>
                    <ul className="list-disc list-inside mt-2 text-sm">
                        <li className="mt-1">10 approbation par jour </li>
                        <li className="mt-1">Access OTP </li>
                        <li className="mt-1">500 message par jour</li>
                    </ul>
                  </CardHeader>
                  <CardBody className="overflow-visible py-4">
                    <Image
                      alt="Popular Plan"
                      className="object-cover rounded-xl"
                      src={complet}
                      width={300}
                    />
                  </CardBody> 
                  <button class="cssbuttons-io-button">
                    Poursuivre
                    <div class="icon">
                      <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                          d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </button>

                </Card>
              </div>
            </div>
    
            {/* Card 3 */}
            <div className="card-wrapper group w-[300px]">
              <div className="bg-gradient-to-br from-green-400 to-teal-500 p-[3px] rounded-2xl transition-transform duration-300 transform group-hover:scale-110">
                <Card className="py-6 bg-white rounded-xl shadow-lg">
                  <CardHeader className="pb-0 pt-4 px-6 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">Entreprise</p>
                    <small className="text-default-500">Illimitee</small>
                    <h2 className="font-bold text-xl mt-2">10000 $ / mois</h2>
                    <ul className="list-disc list-inside mt-2 text-sm">
                        <li className="mt-1">Approbation Illimite </li>
                        <li className="mt-1">Access OTP </li>
                        <li className="mt-1">message illimite</li>
                    </ul>
                  </CardHeader>
                  <CardBody className="overflow-visible py-4">
                    <Image
                      alt="Enterprise Plan"
                      className="object-cover rounded-xl"
                      src={illimite}
                      width={300}
                    />
                  </CardBody>
                  <button class="cssbuttons-io-button">
                    Poursuivre
                    <div class="icon">
                      <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                          d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </button>
                    
                </Card>
              </div>
            </div>
          </div>
        </>
      )
}

export default PaiementCard