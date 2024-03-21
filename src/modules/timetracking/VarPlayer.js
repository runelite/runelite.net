// @ts-nocheck
/* eslint-disable */
/**
 * Server controlled "content-developer" integers.
 *
 * VarPlayers are stored per RuneScape player save, and synchronized
 * from the server to the client. The client can change them preemptively
 * if it thinks they will change the next tick as a lag-hiding measure.
 * The client CANNOT directly make the server change a varbit.
 * @class
 */
export class VarPlayer {}
/**
 * Bird house states
 */
VarPlayer.BIRD_HOUSE_MEADOW_NORTH = 1626
VarPlayer.BIRD_HOUSE_MEADOW_SOUTH = 1627
VarPlayer.BIRD_HOUSE_VALLEY_NORTH = 1628
VarPlayer.BIRD_HOUSE_VALLEY_SOUTH = 1629
VarPlayer['__class'] = 'timetracking.VarPlayer'
